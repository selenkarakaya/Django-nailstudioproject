from django.db import migrations
import cloudinary.models

class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_alter_appt_message"),
    ]

    operations = [
        migrations.AddField(
            model_name="feedback",
            name="image",
            field=cloudinary.models.CloudinaryField(
                blank=True,
                null=True,
                max_length=255,
                verbose_name="image",
            ),
        ),
    ]
